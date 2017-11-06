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
from static import foo
from django.utils import timezone

# from django.views.decorators.csrf import csrf_exempt

def login(request):
    return render(request, "index_signin_v2.html")
def form(request):
    if 'sid' not in request.session.keys():
        return render(request, "index_signin_v2.html")
    print 'views.form sid:',request.session['sid']
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
    print request.session['sid']
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

    # img source: 1-5 normal pics    6,7:aad    8-12:aso    13,14:bad    15-29:bso
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
        # pick_out = prepare_img()
        # base_pics = range(1,8)
        #aad
        if data['exp_group'] == 1:
            data['img_seq'] = range(1,6)
            random.shuffle(data['img_seq'])
            data['img_seq'] += [6,7]
        #aso
        elif data['exp_group'] == 2:
            data['img_seq'] = random.sample(range(1,6),3) + foo(range(8,13))
            random.shuffle(data['img_seq'])
            # for i in pick_out:
            #     base_pics = [i+9 if x==i else x for x in base_pics]
            # data['img_seq'] = base_pics
        #bad
        elif data['exp_group'] == 3:
            data['img_seq'] = range(1,6)
            random.shuffle(data['img_seq'])
            data['img_seq'] += [13,14]
        #bso
        elif data['exp_group'] == 4:
            data['img_seq'] = random.sample(range(1,6),3) + foo(range(15,20))
            random.shuffle(data['img_seq'])
            # for i in pick_out:
            #     base_pics = [i+18 if x==i else x for x in base_pics]
            # data['img_seq'] = base_pics
        
        data['sid'] = registrationRecord.sid
        data['tracking'] = 0
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
        data['sid'] = registrationRecord.sid
        collect_group = int(registrationRecord.collect_group)
        data['collect_group'] = collect_group

        img_seq = registrationRecord.img_seq
        img_seq = list(eval(img_seq.strip('[').strip(']')))
        data['img_seq'] = img_seq
        data['tracking'] = registrationRecord.tracking
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

            registrationRecord.reg_time = datetime.datetime.now()  
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
        registrationRecord.access_time = datetime.datetime.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    return JsonResponse({"message": "fail","myStatus":1})



def recog(request):
    registrationRecord = RegistrationRecord.objects.filter(sid=request.POST['info'])[0]
    if registrationRecord.recog == 'nil':
        print request.POST['info'],'is updating recog',request.POST['fb']
        registrationRecord.recog = request.POST['fb']
        registrationRecord.reg_time = datetime.datetime.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    else:
        return JsonResponse({"message": "already selected","myStatus":1})

def beforerecog(request):
    print request.session['sid']
    registrationRecord = RegistrationRecord.objects.filter(sid=request.session['sid'])[0]
    if registrationRecord.recog == 'nil':
        registrationRecord.access_time = datetime.datetime.now()
        registrationRecord.save()
        return JsonResponse({"message": "success","myStatus":0})
    return JsonResponse({"message": "fail","myStatus":1})














