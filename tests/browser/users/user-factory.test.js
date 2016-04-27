describe('User Factory', function() {

  var users, UserFactory, $httpBackend;

  beforeEach(module('FullstackGeneratedApp'));

  beforeEach(inject(function(_UserFactory_, _$httpBackend_) {
    UserFactory = _UserFactory_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function() {
    users = [
      { email: 'larry@stooges.com', password: 'dumb', _id: '0' },
      { email: 'moe@stooges.com', password: 'dumber', _id: '1' },
      { email: 'curly@stooges.com', password: 'dumbest', _id: '2' }
    ];
  });

  it('it exists', function() {
    expect(UserFactory).to.be.ok;
  });

  describe('getOne', function() {
    it('calls /api/users/0', function() {
      var user;
      $httpBackend.expectGET('/api/users/0')
        .respond(users[0]);
      UserFactory.getOne(0)
        .then(function(_user_) {
          user = _user_;
        });
      $httpBackend.flush();
      expect(user.email).to.equal('larry@stooges.com');

    });
  });

  describe('delete', function() {
    it('calls api/users/0', function() {
      $httpBackend.expectDELETE('/api/users/0')
        .respond(204);
      UserFactory.delete(0)
        .then(function(response) {
          expect(response.status).to.equal(203);
        });
    });
  });

});