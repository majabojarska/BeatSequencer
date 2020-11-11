from pathlib import Path
import os
import shutil


instrument_dirs = ['saw','sine','square','tri']

for f in [*instrument_dirs, 'out']:
    shutil.rmtree(f, ignore_errors=True)

os.system("octave generate_soundpacks.m")
os.mkdir('out')

for instrument_dir in instrument_dirs:
    for wav in os.listdir(instrument_dir):
        num_str = wav[:-4].zfill(3)
        shutil.move(os.path.join(instrument_dir, wav), os.path.join('out', f"{instrument_dir}_{num_str}.wav"))

for f in instrument_dirs:
    shutil.rmtree(f)

