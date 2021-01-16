# antartika-global-node-mongo-test


1) Registration:

API END POINT : localhost:3000/users/register
Header:
    Content-Type: application/json

Method: HTTP/POST

Body:
    {
        "firstName":"gajanan",
        "lastName":"sawant",
        "organization":"Antartica Global",
        "emailId":"gajanan@gmail.com",
        "password":"mypass@123",
        "employeeId":"ANTG0016"
    }    
Response:
   On Success:
        {
            "data": {
                "firstName": "gajanan",
                "lastName": "sawant",
                "emailId": "gajanan@gmail.com",
                "organization": "Antartica Global",
                "employeeId": "ANTG0016"
            },
            "message": "Registeration is successfull !"
        }    

   On Failure:
        {
            "data": {},
            "message": "Validation error"
        }

2) Login:        
API END POINT : localhost:3000/users/login
Header:
    Content-Type: application/json

Method: HTTP/POST

Body:
   {
    "emailId":"ssd1110@gmail.com",
    "password":"mypass@123"
  }
Response:
   On Success:
        {
            "data": {
                "loginToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTA4MDcwODksImRhdGEiOnsiZmlyc3ROYW1lIjoic2FuZ3JhbSIsImxhc3ROYW1lIjoiZGVzYWkiLCJlbWFpbElkIjoic3NkMTExMEBnbWFpbC5jb20iLCJvcmdhbml6YXRpb24iOiJBbnRhcnRpY2EgR2xvYmFsIiwiaWQiOjEsImVtcGxveWVlSWQiOiJBTlRHMDAwMSJ9LCJpYXQiOjE2MTA4MDM0ODl9.gHAc2oEiUb9JJp5n6Dc-3CmsvdIyjkg21Yuq3lLn8bI"
            },
            "message": "login Successfull"
        }  

   On Failure:
        {
            "data": {},
            "message": "Username or password does not match"
        }

3) USER-LIST:        
API END POINT : localhost:3000/users/userList

Header:
      Authorization:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTA4MDcwODksImRhdGEiOnsiZmlyc3ROYW1lIjoic2FuZ3JhbSIsImxhc3ROYW1lIjoiZGVzYWkiLCJlbWFpbElkIjoic3NkMTExMEBnbWFpbC5jb20iLCJvcmdhbml6YXRpb24iOiJBbnRhcnRpY2EgR2xvYmFsIiwiaWQiOjEsImVtcGxveWVlSWQiOiJBTlRHMDAwMSJ9LCJpYXQiOjE2MTA4MDM0ODl9.gHAc2oEiUb9JJp5n6Dc-3CmsvdIyjkg21Yuq3lLn8bI

Method: HTTP/GET

Query Parameter:
   firstName=&lastName=&employeeId=&pageNumber=0

   if pageNumber is zero all records are returned at once,else paging with perpage value 5 is done.

Response:
   On Success with records:
        {
    "data": [
        {
            "id": 12,
            "firstName": "amruta",
            "lastName": "salvi",
            "emailId": "amruta@gmail.com",
            "employeeId": "ANTG0010",
            "organization": "Antartica Global"
        },
        {
            "id": 10,
            "firstName": "aniket",
            "lastName": "salvi",
            "emailId": "aniket@gmail.com",
            "employeeId": "ANTG0008",
            "organization": "Antartica Global"
        },
        {
            "id": 11,
            "firstName": "anil",
            "lastName": "salvi",
            "emailId": "anil@gmail.com",
            "employeeId": "ANTG0009",
            "organization": "Antartica Global"
        },
        {
            "id": 18,
            "firstName": "gajanan",
            "lastName": "sawant",
            "emailId": "gajanan@gmail.com",
            "employeeId": "ANTG0016",
            "organization": "Antartica Global"
        },
        {
            "id": 17,
            "firstName": "ganesh",
            "lastName": "sawant",
            "emailId": "ganesh@gmail.com",
            "employeeId": "ANTG0015",
            "organization": "Antartica Global"
        }
    ],
    "message": "Total 5 record(s) found !"
}

   On No Records:
        {
        "data": [],
        "message": "Total 0 record(s) found !"
        }
