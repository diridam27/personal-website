from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

imaginea = Image.open("/home/diridam/personal-website/turul/sulap.png").convert('RGB')
font = ImageFont.truetype("font.ttf", 16)
pixeli = imaginea.load()
draw = ImageDraw.Draw(imaginea)

for i in range(imaginea.size[0]):
    for j in range(imaginea.size[1]):
        if(pixeli[i, j] == (0, 255, 0)):
            draw.text((i + 5, j + 5), str(i) + ", " + str(j), (255, 255, 128), font=font)
        if(pixeli[i, j] == (0, 0, 255)):
            draw.text((i - len(str(pixeli)), j - 21), str(i) + ", " + str(j), (128, 255, 255), font=font)

imaginea.save("test.png")
