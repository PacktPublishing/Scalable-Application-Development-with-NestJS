// pseudo code

{
    provide: 'MY_FACTORY_TOKEN', 
    useFactory: (connection: Connection) => { 
      return new MyCustomClass(connection); 
    }, 
    inject: [DbConnectionToken],
}
