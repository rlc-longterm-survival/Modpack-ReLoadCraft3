import cv2
import numpy as np
from PIL import Image

def modify_color(src: tuple[int], sample: tuple[int], sample_saturate, lighten_ratios: list):
    assert len(src) == 3 or len(src) == 4
    sample_lab = cv2.cvtColor(np.uint8([[sample[0:3]]]), cv2.COLOR_RGB2Lab)[0][0]
    sample_lab = oversaturate_lab(sample_lab, sample_saturate)
    src_lab = cv2.cvtColor(np.uint8([[src[0:3]]]), cv2.COLOR_RGB2Lab)[0][0]
    
    if src_lab[1] != 128 or src_lab[2] != 128:
        return src
    
    src_lab[1], src_lab[2] = sample_lab[1], sample_lab[2]
    
    for lighten_ratio in lighten_ratios:
        if lighten_ratio > 0: src_lab[0] = 255 - int((255 - src_lab[0]) * (1 - lighten_ratio))
        else: src_lab[0] = int(src_lab[0] * (1 + lighten_ratio))
    
    dst = cv2.cvtColor(np.uint8([[src_lab]]), cv2.COLOR_LAB2RGB)[0][0]
    dst = [ int(dst[0]), int(dst[1]), int(dst[2]) ]
    if len(src) == 4:
        dst.append(src[3])
    return tuple(dst)

def oversaturate_lab(src: tuple[int], ratio):
    dst = list(src[:])
    for i in range(1, 3):
        dst[i] = (int(dst[i]) - 128) * ratio + 128
        if dst[i] < 0: dst[i] = 0
        if dst[i] > 255: dst[i] = 255
    return tuple(dst)

def modify_image_color(src: Image.Image, sample: tuple[int], sample_saturate, lighten_ratios: list):
    for i in range(src.size[0]):
        for j in range(src.size[1]):
            src_color = src.getpixel((i, j))
            dst_color = modify_color(src_color, sample, sample_saturate, lighten_ratios)
            src.putpixel((i, j), dst_color)

def process_note(note_id: int):
    dst_path = "../note_item_%d.png" % note_id
    
    base_image = Image.open("notes/base.png")
    colormap = Image.open("notes/colormap.png")
    octave_image = None
    note_image = None
    note_apply_color = False
    if note_id == 0:
        octave_image = Image.open("notes/octave-2.png")
        note_image = Image.open("notes/rest.png")
    else:
        note_apply_color = True
        c0_pitch = 24 + 5 + note_id
        octave = c0_pitch // 12
        note = c0_pitch % 12
        octave_image = Image.open("notes/octave-%d.png" % octave)
        note_image = Image.open("notes/note-%d.png" % note)
    
    if note_apply_color:
        sample = colormap.getpixel((note, octave))
        
        light_octave = 0
        if octave == 2:
            light_octave = -0.4
        elif octave == 3:
            light_octave = -0.2
        elif octave == 4:
            light_octave = 0
        elif octave == 5:
            light_octave = 0.4
        
        modify_image_color(octave_image, sample, 0.7, [ light_octave ])
        modify_image_color(note_image, sample, 0.7, [ light_octave ])
    
    base_image.alpha_composite(octave_image)
    base_image.alpha_composite(note_image)
    base_image.save(dst_path)    

    pass

for i in range(0, 38):
    process_note(i)
    
base_image = Image.open("notes/base.png")
base_image.save("../note_item.png")
