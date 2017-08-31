#!/usr/bin/python

# Import modules for CGI handling 
import cgi, cgitb, json, urllib2

response = {}

# Check response
form = cgi.FieldStorage() 
myTagsField = form.getvalue('tags')
myTags = {}
if myTagsField is not None:
	json.loads(str(myTagsField))

print "Content-type:application/json"
print ""
print json.dumps(response)