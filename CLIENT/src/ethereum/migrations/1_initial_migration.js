const Migrations = artifacts.require("OrganChain");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};