"""Convert YouTube scripts (.md) to Jupyter notebooks (.ipynb).

Usage: python convert_scripts_to_ipynb.py [module_id ...]
If no module_id given, converts all 36 scripts.
"""

import sys, json, re
from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent / "youtube-scripts"
OUT_DIR = Path(__file__).parent / "youtube-notebooks"

def md_to_ipynb(md_text):
    lines = md_text.split("\n")
    cells = []
    buffer = []
    in_code = False

    def flush(force_code=False):
        nonlocal buffer
        if not buffer:
            return
        text = "\n".join(buffer)
        if force_code or in_code:
            cells.append({
                "cell_type": "code",
                "metadata": {},
                "source": text.split("\n"),
                "outputs": []
            })
        else:
            cells.append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [f"{line}\n" for line in text]
            })
        buffer = []

    for line in lines:
        if line.startswith("```python"):
            flush()
            in_code = True
            continue
        elif line.startswith("```"):
            flush(force_code=in_code)
            in_code = False
            continue
        buffer.append(line)
    flush()

    nb = {
        "nbformat": 4,
        "nbformat_minor": 5,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "name": "python",
                "version": "3.10.0"
            }
        },
        "cells": cells
    }
    return nb

def main():
    targets = sys.argv[1:] if len(sys.argv) > 1 else []
    md_files = sorted(SCRIPTS_DIR.glob("module-*.md"))
    if targets:
        md_files = [f for f in md_files if any(t in f.stem for t in targets)]

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for mdf in md_files:
        nb = md_to_ipynb(mdf.read_text(encoding="utf-8"))
        outfile = OUT_DIR / mdf.with_suffix(".ipynb").name
        outfile.write_text(json.dumps(nb, indent=1, ensure_ascii=False), encoding="utf-8")
        print(f"  [OK] {outfile.name} ({len(nb['cells'])} cells)")

if __name__ == "__main__":
    main()
