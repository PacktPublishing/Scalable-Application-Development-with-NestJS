// TypeScript file for the AuthGuard class
// relavant imports must be added
// pseudo code

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return !!request;
  }
}
