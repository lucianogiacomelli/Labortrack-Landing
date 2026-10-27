"""Genera un .webp junto a cada .png de una carpeta, sin modificar los PNG.

Para cada imagen usa la opción más chica entre calidad 90 y sin pérdida.
Si el canal alfa no se usa, convierte a RGB.

Uso: python scripts/webp.py public/capturas
Requiere Pillow (pip install pillow). No es dependencia del proyecto.
"""

import io
import sys
from pathlib import Path

from PIL import Image


def convertir(png: Path) -> None:
    imagen = Image.open(png)
    if imagen.mode == "RGBA" and imagen.getchannel("A").getextrema() == (255, 255):
        imagen = imagen.convert("RGB")

    opciones = {"calidad 90": {"quality": 90, "method": 6}, "sin pérdida": {"lossless": True, "method": 6}}
    resultados = {}
    for nombre, parametros in opciones.items():
        buffer = io.BytesIO()
        imagen.save(buffer, "WEBP", **parametros)
        resultados[nombre] = buffer.getvalue()

    nombre, datos = min(resultados.items(), key=lambda item: len(item[1]))
    png.with_suffix(".webp").write_bytes(datos)
    antes = png.stat().st_size / 1024
    despues = len(datos) / 1024
    print(f"{png.name}: {antes:.0f} KB -> {despues:.0f} KB ({nombre}, -{100 - 100 * despues / antes:.0f} %)")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit("Uso: python scripts/webp.py <carpeta>")
    for png in sorted(Path(sys.argv[1]).glob("*.png")):
        convertir(png)
