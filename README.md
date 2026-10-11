# SkLoL Skins

O repositório oficial de skins do [SkLoL](https://github.com/fky-kauany/sklol-plugin): as skins que já vêm na loja do app.

Nada aqui é editado à mão. Tudo é gerado pelo `bun run skins` do SkLoL, e os números de download são atualizados por uma GitHub Action.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.json` | O catálogo: todas as skins e os criadores, num arquivo só. É o que o app lê. |
| `creators.json` | O perfil de cada criador: nome, avatar, bio e redes. |
| `creators/<id>.webp` | O avatar de cada criador. |
| `skins/<id>/skin.json` | A skin inteira, com a descrição. |
| `skins/<id>/thumb.webp` | A foto da skin (1280x720). |
| `skins/<id>/chromas/<chroma>.webp` | A foto de cada chroma. |

Os pacotes (`.fantome`) ficam nas **releases**: cada skin tem a release `skin-<id>`, e cada versão da skin e de cada chroma é um anexo dela (`<id>-v3.fantome`, `<id>--<chroma>-v1.fantome`).

## Uma skin no índice

```json
{
	"id": "ahri-celestial",
	"name": "Ahri Celestial",
	"champion": 103,
	"base": 0,
	"creator": "kauany",
	"parts": ["model", "textures", "vfx", "animations"],
	"patch": "16.20",
	"publishedAt": "2026-10-11",
	"updatedAt": "2026-10-11",
	"downloads": 0,
	"thumb": "skins/ahri-celestial/thumb.webp?v=1a2b3c4d",
	"file": { "version": 1, "asset": "ahri-celestial-v1.fantome", "size": 48213504, "sha256": "…" },
	"chromas": [
		{
			"id": "rubi",
			"name": "Rubi",
			"color": "#e0115f",
			"thumb": "skins/ahri-celestial/chromas/rubi.webp?v=5e6f7a8b",
			"patch": "16.20",
			"file": { "version": 1, "asset": "ahri-celestial--rubi-v1.fantome", "size": 47100000, "sha256": "…" }
		}
	]
}
```

- `champion`: o id do campeão no client.
- `base`: a skin do jogo que o pacote troca (0 é a skin padrão).
- `parts`: o que a skin troca. Os valores possíveis são `model`, `textures`, `vfx`, `animations`, `sounds`, `voice` e `icons`.
- `patch`: o patch em que o pacote foi carregado.
- `broken`: aparece quando a skin está quebrada, com o patch em que quebrou e desde quando.
