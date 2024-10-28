@Get('annotate') 
annotateRequest(@Req() request: Request) { 
  // Adding custom metadata 
  request['customMetadata'] = { 
    timestamp: new Date(), 
    userAgent: request.headers['user-agent'], 
    route: request.route.path 
  }; 
  // Further processing... 
}