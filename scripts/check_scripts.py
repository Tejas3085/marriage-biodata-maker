# Scans scripts/lang_data.py: each LANGS["xx"] block may only contain its own
# Indic script (+ ASCII + common punctuation). Reports intruders.
import io
import re
import sys

RANGES = {
    "ta": ("Tamil", 0x0B80, 0x0BFF),
    "te": ("Telugu", 0x0C00, 0x0C7F),
    "bn": ("Bengali", 0x0980, 0x09FF),
    "gu": ("Gujarati", 0x0A80, 0x0AFF),
    "kn": ("Kannada", 0x0C80, 0x0CFF),
    "pa": ("Gurmukhi", 0x0A00, 0x0A7F),
    "hi": ("Devanagari", 0x0900, 0x097F),
    "mr": ("Devanagari", 0x0900, 0x097F),
}

INDIC = [(name, lo, hi) for name, lo, hi in RANGES.values()]

# U+0964/0965 (danda/double danda) live in the Devanagari block but are
# legitimately shared by Bengali, Gurmukhi and other Indic scripts.
SHARED_PUNCT = {0x0964, 0x0965}


def script_of(ch):
    o = ord(ch)
    if o in SHARED_PUNCT:
        return None
    for name, lo, hi in INDIC:
        if lo <= o <= hi:
            return name
    return None


src = io.open("scripts/lang_data.py", encoding="utf-8").read().split("\n")
starts = [(i, m.group(1)) for i, l in enumerate(src) if (m := re.match(r'LANGS\["(\w+)"\]', l))]
starts.append((len(src), None))

problems = 0
for idx in range(len(starts) - 1):
    s, code = starts[idx]
    e, _ = starts[idx + 1]
    if code not in RANGES:
        continue
    own = RANGES[code][0]
    for ln in range(s, e):
        for ch in src[ln]:
            sc = script_of(ch)
            if sc and sc != own:
                problems += 1
                print(f"{code} line {ln + 1}: {sc} char U+{ord(ch):04X} in: {src[ln].strip()[:80]}")

print("intruders:", problems)
sys.exit(1 if problems else 0)
