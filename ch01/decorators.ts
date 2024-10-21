// pseudo code

@Get('profile')
async getProfile(@Req() request: Request) { 
  return this.usersService.find(request.userId); 
}
