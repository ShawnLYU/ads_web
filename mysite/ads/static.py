datetime_format = '%Y-%m-%d %H:%M:%S'
import random
def prepare_img():
    isValid = False
    a=random.randint(1,7)
    b=random.randint(1,7)
    while isValid==False:
        if a in [1,2] and b in [1,2]:
            a=random.randint(1,7)
            b=random.randint(1,7)
        elif a in [3,4] and b in [3,4]:
            a=random.randint(1,7)
            b=random.randint(1,7)
        elif a in [5,6,7] and b in [5,6,7]:
            a=random.randint(1,7)
            b=random.randint(1,7)
        else:
            isValid = True
    return [a,b]
