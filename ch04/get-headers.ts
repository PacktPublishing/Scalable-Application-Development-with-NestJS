@Get('headers') 
showHeaders(@Req() request: Request) { 
  return request.headers; 
} 
