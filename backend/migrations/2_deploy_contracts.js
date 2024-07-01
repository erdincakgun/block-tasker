const BlockTasker = artifacts.require("BlockTasker");

module.exports = function (deployer) {
  deployer.deploy(BlockTasker);
};
