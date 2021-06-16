# User Service
Service which is using Node runtime environment, having RESTful API for Registration Login and getUserList using proper authentication.
    Routes: 
         # User Registration (For Registering new user)
            user schema:  { firstName,lastName, emailId, organsization,password, employeeID}; employeeID is autogenrated mongo_id which is stored as employeeID
        # User Login {}
        # Get User 
    Models: 
        # Schema for user
    utils: 
        #authUtils.js: consist of function for {getToken, authenticateToken, validating verifed user login}
        #utils.js: it consist validation for user imput like Email 
    Index.js: 
        #Entry point to this service
    package.json: 
        #contains all npm packge require for this service
