# Generates public/formLang/{code}.json and public/homeLang/{code}.json
# from public/formLang/en.json + scripts/lang_data.py translations.
# Usage: python3 scripts/build_lang.py [ta te bn ...]  (default: all)
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from lang_data import LANGS

HEIGHT_RE = re.compile(r"^(\d+)\s+ft\s+(\d+)\s+in$")


def build_one(code: str, t: dict) -> None:
    with open(ROOT / "public" / "formLang" / "en.json", encoding="utf-8") as f:
        en = json.load(f)

    out = dict(en)
    for k in ("godTitle", "uploadPhotoLabel", "generateBiodataBtnLabel", "headerSubTitle"):
        out[k] = t["top"][k]

    cx_key = t["options"].get("complexion_key", "varna")

    for i, sec in enumerate(out["fieldSections"]):
        st = t["sections"][i]
        sec["title"] = st["title"]
        sec["addExtraFiels"] = st["addExtraFiels"]
        sec["NewFieldLabel"] = st["NewFieldLabel"]
        sec["NewFieldValue"] = st["NewFieldValue"]
        for f in sec["fields"]:
            key = (sec["key"], f["key"])
            if key in t["fields"]:
                label, ph = t["fields"][key]
                if label:
                    f["label"] = label
                if ph:
                    f["placeholder"] = ph
            if f["key"] in t["options"] and "options" in f:
                f["options"] = list(t["options"][f["key"]])
            if f["key"] == cx_key and "options" in f:
                f["options"] = list(t["options"]["complexion"])
            if f["key"] == "height" and "options" in f:
                u1, u2 = t["height_units"]
                f["options"] = [
                    re.sub(r"^(\d+)\s+ft\s+(\d+)\s+in$", rf"\1 {u1} \2 {u2}", o)
                    for o in f["options"]
                ]
            # bloodGroup options (A+, O- …) are universal — keep as-is

    form_path = ROOT / "public" / "formLang" / f"{code}.json"
    with open(form_path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")

    with open(ROOT / "public" / "homeLang" / "en.json", encoding="utf-8") as f:
        home_en = json.load(f)
    home = dict(home_en)
    for k, v in t["home"].items():
        home[k] = v
    home_path = ROOT / "public" / "homeLang" / f"{code}.json"
    with open(home_path, "w", encoding="utf-8") as f:
        json.dump(home, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"{code}: form + home written")


def verify(code: str) -> None:
    with open(ROOT / "public" / "formLang" / "en.json", encoding="utf-8") as f:
        en = json.load(f)
    with open(ROOT / "public" / "formLang" / f"{code}.json", encoding="utf-8") as f:
        got = json.load(f)
    assert set(got.keys()) == set(en.keys()), f"{code}: top keys differ"
    assert len(got["fieldSections"]) == len(en["fieldSections"])
    for a, b in zip(got["fieldSections"], en["fieldSections"]):
        assert a["key"] == b["key"], f"{code}: section key {a['key']} != {b['key']}"
        assert len(a["fields"]) == len(b["fields"]), f"{code}: field count differs in {a['key']}"
        for fa, fb in zip(a["fields"], b["fields"]):
            assert fa["key"] == fb["key"] and fa["type"] == fb["type"], f"{code}: field mismatch {fb['key']}"
            if "options" in fb:
                assert len(fa.get("options", [])) == len(fb["options"]), f"{code}: options count differs for {fb['key']}"
    print(f"{code}: structure OK")


if __name__ == "__main__":
    codes = sys.argv[1:] or sorted(LANGS.keys())
    for code in codes:
        build_one(code, LANGS[code])
    for code in codes:
        verify(code)
