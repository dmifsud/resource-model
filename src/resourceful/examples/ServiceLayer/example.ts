import {UserApiResource} from "../ResourceLayer/UserResource";

//creates one empty resource reference
var userResource = UserApiResource.one();

console.group("Empty");
console.log(UserApiResource.one());
console.groupEnd();

//Model can be modified
console.group("Modified");
userResource.model.id = 42;
userResource.model.name = "David";
userResource.model.surname = "Mifsud"
console.log(userResource);
//and can be saved
userResource.save();
console.groupEnd();

console.group("Another empty");
console.log(UserApiResource.one());
console.groupEnd();

console.group("Another Modified");
//an id can be passed directly to the .one method
var anotherUser = UserApiResource.one(33);

console.log(anotherUser);
//getting user with id 33
//GET: /users/33
anotherUser.get().then(userModel => {
  console.log(userModel);
});
console.groupEnd();

console.group("Previous model");
console.log(userResource.model);
console.groupEnd();

//TODO: next UserApiResource.one(32).AddressRelation.many().get()
//           GET: /users/32/addresses

//TODO: also figure out how to get UserApiResource.save(aUserModel)
//           POST: /users => aUserModel object