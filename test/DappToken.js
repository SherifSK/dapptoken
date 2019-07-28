var DappToken = artifacts.require("./DappToken.sol");

contract('DappToken', function(accounts) {
    var tokenInstance;

    it('initialises the token with the correct values', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.name();
        }).then(function(tokenName) {
            assert.equal(tokenName, 'DApp Token', 'sets the token name to DApp Token');
            return tokenInstance.symbol();
        }).then(function(tokenSymbol) {
            assert.equal(tokenSymbol, 'DAPP', 'sets the token symbol to DAPP');
            return tokenInstance.standard();
        }).then(function(tokenStandard) {
            assert.equal(tokenStandard, 'DApp Token v1.0', 'sets the token standard to DApp Token v1.0');
        });
    });

    it('sets the total supply upon deployment', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply) {
            assert.equal(totalSupply, 1000000, 'sets the total supply to 1,000,000');
        });
    });

    it('allocates the total supply to the admin account', function() {
        return DappToken.deployed().then(function(instance) {
            tokenInstance = instance;
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance) {
            assert.equal(adminBalance.toNumber(), 1000000, 'allocates the inital supply to the admin account');
        });
    });
})