CREATE TABLE IF NOT EXISTS "tblUsers" ("
		id"   SERIAL , 
		"firstName" VARCHAR(50), 
		"lastName" VARCHAR(50), 
		"emailId" VARCHAR(100), 
		"organization" VARCHAR(100), 
		"password" VARCHAR(150), 
		"employeeId" VARCHAR(150), 
		"createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
		"deletedAt" TIMESTAMP WITH TIME ZONE, PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "tbl_users_email_id" ON "tblUsers" ("emailId");
CREATE UNIQUE INDEX "tbl_users_employee_id" ON "tblUsers" ("employeeId");
