describe('User Factory', function(){
	var UserFactory;
	
	beforeEach(module('FullstackGeneratedApp'));
	
	beforeEach(inject(function(_UserFactory_){
		UserFactory = _UserFactory_;
	}));

	it('it exists', function(){
		expect(UserFactory).to.be.ok;
	});
	
});