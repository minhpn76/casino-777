const Casino = artifacts.require("Casino");

module.exports = function (deployer) {
  deployer.deploy(Casino, 100000000);
};
