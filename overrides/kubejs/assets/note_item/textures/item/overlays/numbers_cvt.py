import numpy as np
from PIL import Image
import os

def process_number(num: int):
    dst_path = "../number_gesture_%d.png" % num
    
    base_image = Image.open("numbers/base.png")
    for i in range(0, 5):
        if 0 != (num & (1 << i)):
            base_image.alpha_composite(Image.open("numbers/bit-%d.png" % i))
        else:
            path = "numbers/bit-%d-inv.png" % i
            if os.path.exists(path):
                base_image.alpha_composite(Image.open(path))
                
    base_image.save(dst_path)

for i in range(0, 32):
    process_number(i)

base_image = Image.open("numbers/base_item.png")
base_image.save("../number_gesture.png")
