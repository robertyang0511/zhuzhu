#!/usr/bin/env python3
"""
从《疯狂水世界》APK 提取英雄头像（需自行准备 APK）

用法:
  python3 scripts/extract-hero-images.py /path/to/game.apk

提取结果保存到 assets/heroes/extracted/
手动重命名为 {英雄id}.webp 后放入 assets/heroes/ 并在 js/avatars.js 的 HERO_IMAGES 中注册。

依赖: pip install UnityPy Pillow
"""
import sys
import os
import re

def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)

    apk_path = sys.argv[1]
    if not os.path.isfile(apk_path):
        print(f'文件不存在: {apk_path}')
        sys.exit(1)

    try:
        import UnityPy
    except ImportError:
        print('请先安装: pip install UnityPy')
        sys.exit(1)

    out_dir = os.path.join(os.path.dirname(__file__), '..', 'assets', 'heroes', 'extracted')
    os.makedirs(out_dir, exist_ok=True)

    env = UnityPy.load(apk_path)
    count = 0
    keywords = re.compile(r'hero|character|head|icon|avatar|portrait|card', re.I)

    for obj in env.objects:
        if obj.type.name not in ('Texture2D', 'Sprite'):
            continue
        try:
            data = obj.read()
            name = getattr(data, 'm_Name', '') or ''
            if not keywords.search(name):
                continue
            img = data.image
            if img.width < 64 or img.height < 64:
                continue
            safe = re.sub(r'[^\w\-]', '_', name)[:80]
            path = os.path.join(out_dir, f'{safe}.png')
            img.save(path)
            count += 1
            print(f'  + {name} -> {path}')
        except Exception:
            pass

    print(f'\n共导出 {count} 张，请从中挑选英雄头像重命名后使用。')

if __name__ == '__main__':
    main()
