#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb, json, urllib2

response = {}

# Open tags file
tagsFile = urllib2.urlopen('http://localhost:8000/match/tags.json')
tagsStr = tagsFile.read()
tags = json.loads(tagsStr)

# Compute Score
response['score'] = len(tags)

# Check response
form = cgi.FieldStorage() 
myTagsField = form.getvalue('tags')
myTags = {}
if myTagsField is not None:
	json.loads(str(myTagsField))

print "Content-type:application/json"
print ""
print json.dumps(response)