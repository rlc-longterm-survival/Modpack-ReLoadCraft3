import os
import json
import subprocess

os.chdir('../')

manifest = json.load(open('manifest.json', 'r', encoding='utf-8'))
pack_name = manifest['name']
pack_version = manifest['version']
build_zip = '_build/' + pack_name + '-' + pack_version + '.zip'

if os.path.exists(build_zip):
    os.unlink(build_zip)

subprocess.call([ '7z', 'a', build_zip, 'overrides', 'manifest.json', 'mcbbs.packmeta' ])

