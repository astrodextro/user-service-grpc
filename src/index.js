var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var PROTO_PATH = "./src/proto/user.proto";
var options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
var userProto = grpc.loadPackageDefinition(packageDefinition);
var server = new grpc.Server();
var users = [
    { "id": "1", "name": "User 11" },
    { "id": "2", "name": "User 22" },
];
server.addService(userProto.UsersService.service, {
    getAll: function (_, callback) {
        console.log("getting all users", users);
        callback(null, { users });
    },
	// Other calls
});
server.bindAsync("127.0.0.1:7001", grpc.ServerCredentials.createInsecure(), function (error, port) {
    console.log("Server running at http://127.0.0.1:7001");
    server.start();
});
