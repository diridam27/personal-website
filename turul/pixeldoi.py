from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import math

imaginea = Image.open("/home/diridam/personal-website/turul/sulap.png").convert('RGB')
font = ImageFont.truetype("font.ttf", 16)
pixeli = imaginea.load()
draw = ImageDraw.Draw(imaginea)

xes = []
yes = []
res = []

# draw.text (x, y), value, (r, g, b), font=font

def params(a, b):
    l = 0;
    while(pixeli[a, b + l] != (255, 128, 0)):
        l += 1
    print(str(a), ", ", str(b), " - ", l)
    xes.append(a)
    yes.append(b)
    res.append(math.floor(l/2))

for i in range(0, imaginea.size[0]):
    for j in range(0, imaginea.size[1]):
        if(pixeli[i, j] == (255, 0, 255)):
            params(i, j)
for i in range(0, len(xes)):
    draw.text(
        (xes[i], yes[i] + res[i]),
        f"{xes[i] + 2}\n{yes[i] + res[i]}\n{res[i]}",
        (255, 128, 255),
        font=font
    )

imaginea.save("test.png")
