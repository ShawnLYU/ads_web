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
    # 1. a水广告 * 2
    # 2. a水social media * 2
    # 3. b水广告 * 2
    # 4. b水social media * 2
    # 5. 月饼图片 * 7
    # img source: 1-7 normal pics    8,9:aad    10,11:aso    12,13:bad    14,15:bso
    # ads should be adjacent
    if data['exp_group'] == 1:
        data['img_seq'] = mixLists(range(1,8), [8,9])
    elif data['exp_group'] == 2:
        data['img_seq'] = mixLists(range(1,6), [10,11])
    elif data['exp_group'] == 3:
        data['img_seq'] = mixLists(range(1,8), [12,13])
    elif data['exp_group'] == 4:
        data['img_seq'] = mixLists(range(1,6), [14,15])
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
    





















