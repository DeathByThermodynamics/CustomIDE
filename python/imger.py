# three arguments: (list of) img address, save address, save extension

from wand import image
import os
import sys

if len(sys.argv) < 4:
    sys.argv = [0, 'C:/Users/alexh/hoi4example/gre.bmp', 'C:/Users/alexh/hoi4example', 'png']


def saveimg():
    addr = sys.argv[1]
    addrlist = addr.split(";")
    save_addr = sys.argv[2]
    ext = sys.argv[3]
    dims = sys.argv[4].split(";")
    width = int(dims[0])
    height = int(dims[1])

    compression = 'no'
    for fileaddr in addrlist:
        try:
            if ext.endswith('yes'):
                compression = 'yes'
                ext = ext.split("_")[0]
            imgname = fileaddr.split("/")[-1].split(".")[0]
            with image.Image(filename=fileaddr) as img:
                img.resize(width, height)
                img.compression = compression
                img.save(filename=save_addr + "/" + imgname + "." + ext)
        except:
            return 'failed'

    return 'success'

saveimg()
