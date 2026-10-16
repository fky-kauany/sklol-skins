// Soma os downloads de cada skin (todos os anexos da release `skin-<id>`: as versões da skin e das
// chromas) e grava no `downloads` dela, no index.json; as pagas (release `paid-<id>`), no paid.json. Roda na Action `downloads.yml`, com o
// GITHUB_TOKEN da própria Action (1000 pedidos por hora; uma página de 100 releases por pedido).
// O resto do índice não é mexido: ele é montado pelo `bun run skins` do SkLoL.
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const repo = process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const totals = { skin: new Map(), paid: new Map() };

for (let page = 1; ; page++) {
	const response = await fetch(
		`https://api.github.com/repos/${repo}/releases?per_page=100&page=${page}`,
		{
			headers: {
				Accept: "application/vnd.github+json",
				Authorization: `Bearer ${token}`,
			},
		},
	);
	if (!response.ok)
		throw new Error(`GitHub ${response.status}: ${await response.text()}`);
	const releases = await response.json();
	for (const release of releases) {
		const [, kind, id] = /^(skin|paid)-(.+)$/.exec(release.tag_name) ?? [];
		if (!id) continue;
		const sum = release.assets.reduce((n, a) => n + a.download_count, 0);
		totals[kind].set(id, (totals[kind].get(id) ?? 0) + sum);
	}
	if (releases.length < 100) break;
}

let changed = 0;
for (const [file, sums] of [
	["index.json", totals.skin],
	["paid.json", totals.paid],
]) {
	if (!existsSync(file)) continue;
	const index = JSON.parse(readFileSync(file, "utf8"));
	let here = 0;
	for (const skin of index.skins) {
		const downloads = sums.get(skin.id) ?? 0;
		// Nunca desce: um anexo apagado (uma versão velha substituída) leva os downloads dele junto.
		if (downloads > skin.downloads) {
			skin.downloads = downloads;
			here++;
		}
	}
	if (here) writeFileSync(file, `${JSON.stringify(index, null, "\t")}\n`);
	changed += here;
}
console.log(`${changed} skins com downloads novos`);
