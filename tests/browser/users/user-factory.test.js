describe('User Factory', function() {

  var users, UserFactory, $httpBackend;

  beforeEach(module('FullstackGeneratedApp'));

  beforeEach(inject(function(_UserFactory_, _$httpBackend_) {
    users = [
      { email: 'larry@stooges.com', password: 'dumb', _id: '0' },
      { email: 'moe@stooges.com', password: 'dumber', _id: '1' },
      { email: 'curly@stooges.com', password: 'dumbest', _id: '2' }
    ];
    UserFactory = _UserFactory_;
    $httpBackend = _$httpBackend_;
  }));


  it('it exists', function() {
    expect(UserFactory).to.be.ok;
  });

  describe('fetchAll', function() {
    var p;
    it('calls GET /api/users', function() {
      $httpBackend.expectGET('/api/users').respond(users);
      p = UserFactory.fetchAll();
      $httpBackend.flush();
    });

    it('parses the response', function() {
      p.then(function(_users){
        expect(_users[0].email).to.equal('larry@stooges.com');
      });
    });
  });

  describe('fetchOne', function() {
    var p;
    it('calls GET /api/users/0', function() {
      $httpBackend.expectGET('/api/users/0').respond(users[0]);
      p = UserFactory.fetchOne(0);
      $httpBackend.flush();
    });

    it('parses the response', function() {
      p.then(function(user){
        expect(user.email).to.equal('larry@stooges.com');
      });
    });
  });

  describe('delete', function() {
    var p;
    it('calls DELETE /api/users/0', function() {
      $httpBackend.expectDELETE('/api/users/0').respond(204);
      UserFactory.delete(0);
      $httpBackend.flush();
    });
  });

  describe('add', function() {
    var shep = {email: 'shep@stooges.com', password: 'dumberer', _id: 4};
    var p;
    it('calls POST /api/users', function() {
      $httpBackend.expectPOST('/api/users', shep).respond(201, shep);
      p = UserFactory.add(shep);
      $httpBackend.flush();
    });

    it('parses the response', function() {
      p.then(function(user){
        expect(user.email).to.equal('shep@stooges.com');
      });
    });
  });

  describe('update', function() {
    var p;
    var req = {status: 'cross-eyed'};
    it('calls PUT /api/users/0', function() {
      $httpBackend.expectPUT('/api/users/0', req).respond({ email: 'larry@stooges.com', password: 'dumb', _id: '0', status: 'cross-eyed' });
      p = UserFactory.update(0, req);
      $httpBackend.flush();
    });

    it('parses the response', function() {
      p.then(function(user){
        expect(user.status).to.equal('cross-eyed');
      });
    });
  });


});