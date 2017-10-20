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
from static import prepare_img
from django.utils import timezone

# from django.views.decorators.csrf import csrf_exempt

def login(request):
    return render(request, "index_signin_v2.html")
def form(request):
    if 'sid' not in request.session.keys():
        return render(request, "index_signin_v2.html")
    if request.session['collect_group'] == 1:
        return render(request, "form.html")
    else:
        return render(request, "form_2.html")
def afterClaiming(request):
    return render(request, "recog.html")
def prepareInfo(request):
    # registrationRecords = RegistrationRecord.objects.filter(recog = 'nil')
    registrationRecords = RegistrationRecord.objects.all()
    data={}
    data['sids'] = [e.sid for e in registrationRecords]
    data['names'] = [e.name for e in registrationRecords]
    return HttpResponse(json.dumps(data), content_type='application/json')
def home(request):
    # print request.POST
    # print request.POST['sid']
    # print request.POST['name']
    if 'sid' not in request.session.keys():
        return render(request, "index_signin_v2.html")
    # if RegistrationRecord.objects.filter(sid=request.session['sid']).count() > 0:
    #     registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
    #     if registrationRecord.name != request.POST['name']:
    #         return JsonResponse({"message": 'not match',"myStatus":1})
    # else:
    # request.session['sid'] = request.POST['sid']
    # request.session['name'] = request.POST['name']
    return render(request, "index_reg.html")

def mixLists(a,b):
    isNotValid = True
    img_seq = a + b
    while(isNotValid):
        random.shuffle(img_seq)
        if abs(img_seq.index(b[0])-img_seq.index(b[1])) != 1:
            isNotValid = False
    return img_seq

epoch = datetime.datetime.utcfromtimestamp(0)

def unix_time_millis(dt):
    '''
    compute the unix time, or seconds/milliseconds since the 1970 epoch.
    returns a int
    '''
    return int((dt - epoch).total_seconds() * 1000.0)

def initializeExp(request):
    # print 'a',request.session['eid']
    # print RegistrationRecord.objects.filter(sid=request.session['sid'])
    # timeAccessed = datetime.datetime.now()
    # prepare json data for front end
    data={}
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

    # img source: 1-7 normal pics    8,9:aad    10-16:aso    17,18:bad    19-25:bso
    # ads should not be adjacent

    if RegistrationRecord.objects.filter(sid=request.session['sid']).count() == 0:
        # random experiment groups
        # there will be 12 categories of groups
        RegistrationRecord.objects.create(sid=request.session['sid'])
        registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
        this_id = registrationRecord.id % 12
        #this_id = 0
        # print 'this_id',this_id
        '''
        this_id = [0,1,2,...,11]
        group index defined
                    a1  a2  a3  a4
        collect_1   0   1   2   3
        collect_2   4   5   6   7
        collect_3   8   9   10  11

        '''
        # print this_id % 4 + 1
        data['exp_group'] = this_id % 4 + 1 # starting from 1
        # data['collect_group'] = 1
        data['collect_group'] = 1 if this_id < 4 else 2 if this_id < 8 else 3
        # print data['collect_group']
        # data['collect_group'] = 1
        # data['exp_group'] = unix_time_millis(timeAccessed) % 4 + 1 # starting from 1
        # data['collect_group'] = unix_time_millis(timeAccessed) % 3 + 1 # starting from 1
        pick_out = prepare_img()
        base_pics = range(1,8)
        #aad
        if data['exp_group'] == 1:
            data['img_seq'] = range(1,8)
            data['img_seq'] += [8,9]
        #aso
        elif data['exp_group'] == 2:
            for i in pick_out:
                base_pics = [i+9 if x==i else x for x in base_pics]
            data['img_seq'] = base_pics
        #bad
        elif data['exp_group'] == 3:
            data['img_seq'] = range(1,8)
            data['img_seq'] += [17,18]
        #bso
        elif data['exp_group'] == 4:
            for i in pick_out:
                base_pics = [i+18 if x==i else x for x in base_pics]
            data['img_seq'] = base_pics



        # data['access_time'] = timeAccessed.strftime(static.datetime_format)

        
        registrationRecord.sid = request.session['sid']
        registrationRecord.name = request.session['eid']
        registrationRecord.img_seq = data['img_seq']
        # registrationRecord.access_time = timeAccessed
        registrationRecord.collect_group = data['collect_group']
        registrationRecord.exp_group = data['exp_group']
        registrationRecord.save()
    else:
        
        registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
        # print int(registrationRecord.exp_group)
        # print data.keys()
        # data['a']='a'
        # print data.keys()
        exp_group = int(registrationRecord.exp_group)
        data['exp_group'] = exp_group

        collect_group = int(registrationRecord.collect_group)
        data['collect_group'] = collect_group

        img_seq = registrationRecord.img_seq
        img_seq = list(eval(img_seq.strip('[').strip(']')))
        data['img_seq'] = img_seq
    request.session['collect_group'] = data['collect_group']
    return HttpResponse(json.dumps(data), content_type='application/json')

def register(request):
    if 'sid' not in request.session:
        return render(request, "index_signin.html")
    registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
    # print 'views.register',request.POST['cake']
    # print 'views.register',request.POST['water']
    # print 'views.register',request.POST['img_seq']
    # print 'views.register',request.POST['collect_group']
    # print 'views.register',request.POST['exp_group']
    # print 'views.register',request.POST['recog']
    # SID has been used
        
    if registrationRecord.mooncake != 'nil':
        return JsonResponse({"message": "The SID has been registered!","myStatus":0,"collect_group":registrationRecord.collect_group})
    try:
        # registrationRecord = RegistrationRecord.objects.create(sid = request.POST['sid'],name = request.POST['name'],mooncake = request.POST['cake'],water = request.POST['water'],img_seq = request.POST['img_seq'],access_time = datetime.datetime.strptime(request.POST['access_time'], static.datetime_format),reg_time = datetime.datetime.now(),collect_group = request.POST['collect_group'],exp_group = request.POST['exp_group'])
        registrationRecord.mooncake = request.POST['mooncake']

        if request.session['collect_group'] == 1 and registrationRecord.recog == 'nil':

            registrationRecord.reg_time = timezone.now()  
            registrationRecord.water = request.POST['water']
            registrationRecord.recog = request.POST['fb']
        
        registrationRecord.save()
        return JsonResponse({"message": "Registered successfully!","myStatus":1,"collect_group":request.session['collect_group']})
    except Exception as e: 
        print str(e)
        return JsonResponse({"message": str(e),"myStatus":2})
    



def tracking(request):
    print request.session['sid']
    print request.POST['img_index']
    registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
    if int(request.POST['img_index']) > registrationRecord.tracking:
        registrationRecord.tracking = int(request.POST['img_index'])
        registrationRecord.save()
    return HttpResponse('Updated')






def checkSidEid(request):
    # print 'views.checkSidSid',request.POST['sid']
    # print 'views.checkSidEid',request.POST['eid']
    if RegistrationRecord.objects.filter(sid=request.POST['sid']).count() > 0:
        registrationRecord = RegistrationRecord.objects.filter(sid=request.POST['sid'])[0]
        if registrationRecord.name != request.POST['eid']:
            return JsonResponse({"message": 'not match',"myStatus":0})
        else:

            request.session['sid'] = request.POST['sid']
            request.session['eid'] = request.POST['eid']
            return JsonResponse({"message": 'success',"myStatus":1})
    request.session['sid'] = request.POST['sid']
    request.session['eid'] = request.POST['eid']
    return JsonResponse({"message": 'registrations',"myStatus":1})


def beforeRecogAfterClaiming(request):
    print request.POST['sid'],'beforeRecogAfterClaiming'
    registrationRecord = RegistrationRecord.objects.filter(sid=request.POST['sid'])[0]
    if registrationRecord.recog == 'nil':
        registrationRecord.access_time = timezone.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    return JsonResponse({"message": "fail","myStatus":1})



def recog(request):
    registrationRecord = RegistrationRecord.objects.filter(sid=request.POST['info'])[0]
    if registrationRecord.recog == 'nil':
        print request.POST['info'],'is updating recog',request.POST['fb']
        registrationRecord.recog = request.POST['fb']
        registrationRecord.reg_time = timezone.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    else:
        return JsonResponse({"message": "already selected","myStatus":1})

def beforerecog(request):
    print request.session['sid']
    registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
    if registrationRecord.recog == 'nil':
        registrationRecord.access_time = timezone.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    return JsonResponse({"message": "fail","myStatus":1})














