from PIL import Image, ImageFont, ImageDraw
import math

imaginea = Image.open("sulap.png").convert("RGB")
pixeli = imaginea.load()
draw = ImageDraw.Draw(imaginea)
font = ImageFont.truetype("font.ttf", 16)

ROZ = (255, 0, 255)
PORTOCALIU = (255, 128, 0)

def australia(x, y):
    while pixeli[x, y] != PORTOCALIU:
        y += 1
    return y

for x in range(imaginea.width):
    for y in range(imaginea.height):
        if pixeli[x, y] == ROZ:
            y2 = australia(x, y + 1)

            raza = (y2 - y) / 2
            xc = x
            yc = (y + y2) / 2

            draw.text(
                (xc, yc),
                str(math.floor(raza)),
                fill=(128, 255, 0),
                font=font,
                anchor="mm"
            )

imaginea.save("test.png")
