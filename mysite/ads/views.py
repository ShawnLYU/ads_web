# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from views import *
from models import *
import json
from django.http import JsonResponse
import random
import datetime
import static
from django.views.decorators.csrf import csrf_exempt

def home(request):
    return render(request, "index_reg.html")

def mixLists(a,b):
    isNotValid = True
    img_seq = a + b
    while(isNotValid):
        random.shuffle(img_seq)
        if abs(img_seq.index(b[0])-img_seq.index(b[1])) != 1:
            isNotValid = False
    return img_seq



def initializeExp(request):
    # prepare json data for front end
    data={}
    # random experiment groups
    data['exp_group'] = random.randint(1,5)
    data['collect_group'] = random.randint(1,3)
    # define words
    data['words']={
        1:"The earliest discovered traces of art are beads and carvings, and then paintings, from sites dating back to the Upper Paleolithic period. We might expect that early artistic efforts would be crude, but the cave paintings of Spain and southern France show a marked degree of skill. So do the naturalistic paintings on slabs of stone excavated in southern Africa. ",
        2:"Some of those slabs appear to have been painted as much as 28,000 years ago, which suggests that painting in Africa is as old as painting in Europe. But painting may be even older than that. The early Australians may have painted on the walls of rock shelters and cliff faces at least 30,000 years ago, and maybe as much as 60,000 years ago.",
        3:"The researchers Peter Ucko and Andree Rosenfeld identified three principal locations of paintings in the caves of western Europe: (1) in obviously inhabited rock shelters and cave entrances; (2) in galleries immediately off the inhabited areas of caves; ",
        4:"and (3) in the inner reaches of caves, whose difficulty of access has been interpreted by some as a sign that magical-religious activities were performed there.",
        5:"The subjects of the paintings are mostly animals. The paintings rest on bare walls, with no backdrops or environmental trappings. Perhaps, like many contemporary peoples, Upper Paleolithic men and women believed that the drawing of a human image could cause ",
        6:"death or injury, and if that were indeed their belief, it might explain why human figures are rarely depicted in cave art. Another explanation for the focus on animals might be that these people sought",
        7:"to improve their luck at hunting. This theory is suggested by evidence of chips in the painted figures, perhaps made by spears thrown at the drawings. ",
        10:"But if improving their hunting luck was the chief motivation for the paintings, it is difficult to explain why only a few show signs of having been speared. Perhaps the paintings were inspired by the need to increase the supply of animals. Cave art seems to have reached a peak toward the end of the Upper Paleolithic period, when the herds of game were decreasing.   ",
        11:"The particular symbolic significance of the cave paintings in southwestern France is more explicitly revealed, perhaps, by the results of a study conducted by researchers Patricia Rice and Ann Paterson. The data they present suggest that the animals portrayed in the cave paintings were mostly the ones that the painters preferred for meat and for materials such as ",
        12:"hides. For example, wild cattle (bovines) and horses are portrayed more often than we would expect by chance, probably because they were larger and heavier (meatier) than other animals in the environment. In addition, the paintings mostly portray animals that the painters ",
        13:"may have feared the most because of their size, speed, natural weapons such as tusks and horns, and the unpredictability of their behavior. That is, mammoths, bovines, and horses are portrayed more often than deer and reindeer. Thus, the paintings are consistent with the ",
        14:"idea that the art is related to the importance of hunting in the economy of Upper Paleolithic people. Consistent with this idea, according to the investigators, is the fact that the art of the cultural period that followed the Upper Paleolithic also seems to reflect ",
        15:"how people got their food. But in that period, when getting food no longer depended on hunting large game animals (because they were becoming extinct), the art ceased to focus on portrayals of animals.",
        16:"Upper Paleolithic art was not confined to cave paintings. Many shafts of spears and similar objects were decorated with figures of animals. The anthropologist Alexander Marshack has an interesting interpretation of some of the engravings made during the Upper Paleolithic. ",
        19:"He believes that as far back as 30,000 B.C., hunters may have used a system of notation, engraved on bone and stone, to mark phases of the Moon. If this is true, it would mean that Upper Paleolithic people were capable of complex thought and were consciously aware of their environment. ",
        20:"In addition to other artworks, figurines representing the human female in exaggerated form have also been found at Upper Paleolithic sites. It has been suggested that these figurines were an ideal type or an expression of a desire for fertility.",
        21:"The ctags command is searched for on the system PATH. It works by doing a binary search of a memory-mapped tags file, so it will work efficiently with very large (50MB+) tags files if needed.",
        22:"The BTS’s Midterm break Camp 2016 is coming!  -Limited number of spaces!!The camp will be held on 5days-10th to 14th October. 9:00am-12:00pm (3 hours) @ King’s Park! or USRC Please see the attached flyer for details.",
        23:"Apply before 5 October to receive $200 off!This camp will be a great opportunity for all age groups to fast track their fitness and develop their technique, balance and co-ordination.",
        24:"We will provide ample opportunities for the students to practice their match skills and team work on the field during the camp. It will be an intensive, exciting and fun camp for all who join!Join us for a poolside lunch at the USRC after the camp on 14th Friday! 12:30 for $100/child, $180/ adult  (Authentic Indian food and western food!)",
        25:"Column Selection can be used to select a rectangular area of a file. Column selection doesn't operate via a separate mode, instead it makes use of multiple selections.",
    }
    # 1. a水广告 * 2
    # 2. a水social media * 2
    # 3. b水广告 * 2
    # 4. b水social media * 2
    # 5. 月饼图片 * 7
    # img source: 1-7 normal pics    8,9:aad    10-16:aso    17,18:bad    19-25:bso
    # ads should be adjacent
    if data['exp_group'] == 1:
        data['img_seq'] = mixLists(range(1,8), [8,9])
    elif data['exp_group'] == 2:
        data['img_seq'] = mixLists(range(1,6), random.sample(range(10,17),2))
    elif data['exp_group'] == 3:
        data['img_seq'] = mixLists(range(1,8), [17,18])
    elif data['exp_group'] == 4:
        data['img_seq'] = mixLists(range(1,6), random.sample(range(19,26),2))
    elif data['exp_group'] == 5:
        img_seq = range(1,8)
        random.shuffle(img_seq)
        data['img_seq'] = img_seq
    data['access_time'] = datetime.datetime.now().strftime(static.datetime_format)
    return HttpResponse(json.dumps(data), content_type='application/json')

@csrf_exempt
def register(request):
    # request.POST = dict(request.POST.lists())
    print request.POST
    print request.POST['sid']
    print request.POST['name']
    print request.POST['cake']
    print request.POST['water']
    print request.POST['img_seq']
    print request.POST['collect_group']
    print request.POST['exp_group']
    # SID has been used
    if RegistrationRecord.objects.filter(sid=request.POST['sid']).count() > 0:
        return JsonResponse({"message": "The SID has been registered!","myStatus":0,"collect_group":RegistrationRecord.objects.filter(sid=request.POST['sid'])[0].collect_group})
    try:
        registrationRecord = RegistrationRecord.objects.create(sid = request.POST['sid'],name = request.POST['name'],mooncake = request.POST['cake'],water = request.POST['water'],img_seq = request.POST['img_seq'],access_time = datetime.datetime.strptime(request.POST['access_time'], static.datetime_format),reg_time = datetime.datetime.now(),collect_group = request.POST['collect_group'],exp_group = request.POST['exp_group'])
        registrationRecord.save()
        return JsonResponse({"message": "Registered successfully!","myStatus":1,"collect_group":request.POST['collect_group'][0]})
    except Exception as e: 
        return JsonResponse({"message": str(e),"myStatus":2})
    





















