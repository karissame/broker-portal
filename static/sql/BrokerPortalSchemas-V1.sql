USE VIP
GO
IF OBJECT_ID('BrokerPortal.Users', 'U') IS NOT NULL
  DROP TABLE BrokerPortal.Users;
CREATE TABLE BrokerPortal.Users
(
   BrokerID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL --I would have assumed this would be the UserID but I see in other table schemas you are using varchar(50).
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,Username varchar(50) NOT NULL
   ,FirstName varchar(50) NOT NULL
   ,LastName varchar(50) NOT NULL
   ,Password varchar(60) NOT NULL
   ,MarketerCode int --FOREIGN KEY REFERENCES dbo.VIP_Marketers.VIP_MarketerID
   ,UserStatus VARCHAR(8), CHECK (UserStatus in ('active','inactive'))

);
GO
CREATE TABLE BrokerPortal.UserRole
(
   UserRoleID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,BrokerID INT NOT NULL FOREIGN KEY REFERENCES BrokerPortal.Users.BrokerID
   ,UserRole varchar(6), CHECK (UserRole in ('broker','admin'))

);
GO
CREATE TABLE BrokerPortal.Prospects
(
   ProspectID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,ProspectEntityName varchar(50) NOT NULL
   ,ContactFirstName varchar(50) NOT NULL
   ,ContactLastName varchar(50) NOT NULL
   ,ContactTitle varchar(20) NOT NULL
   ,ContactPhone varchar(20)
   ,ContactFax varchar(20)
   ,BillingFirstName varchar(50) NOT NULL
   ,BillingLastName varchar(50) NOT NULL
   ,BillingAddressLine1 varchar(100) NOT NULL
   ,BillingAddressLine2 varchar(20)
   ,BillingAddressCity varchar(50) NOT NULL
   ,BillingAddressState varchar(2) NOT NULL
   ,BillingAddressZip varchar(5) NOT NULL
   ,FederalTaxID varchar(9) --Can they leave this blank on the contract?
   ,DUNS_Number varchar(12) --Do we want this to be a bigint instead?

);
GO
CREATE TABLE BrokerPortal.BrokerProspect
(
   BrokerProspectID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,BrokerID INT NOT NULL FOREIGN KEY REFERENCES BrokerPortal.Users (BrokerID)
   ,ProspectID INT NOT NULL FOREIGN KEY REFERENCES BrokerPortal.Prospects (ProspectID)

);
GO
CREATE TABLE BrokerPortal.ProspectMeters
(
   ProspectMeterID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,ProspectID int FOREIGN KEY REFERENCES BrokerPortal.Prospects (ProspectID)
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,MeterAccountNumber varchar(20) NOT NULL
   ,MeterAddressLine1 varchar(100) NOT NULL
   ,MeterAddressLine2 varchar(20)
   ,MeterAddressCity varchar(50) NOT NULL
   ,MeterAddressState varchar(2) NOT NULL
   ,MeterAddressZip varchar(5) NOT NULL
   ,MeterCreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,IsCustomer bit NOT NULL DEFAULT(0)
   ,VIPCustomerID int--FOREIGN KEY REFERENCES the VIP "customers" id, unsure of name
   ,PremiseType varchar(20) NOT NULL
   ,Profile varchar(20) NOT NULL
   ,AnnualUsage int NOT NULL
   ,Utility varchar(40)
   ,VIP_Validated bit NOT NULL DEFAULT(0)

);
GO
CREATE TABLE BrokerPortal.Quotes
(
   QuoteID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,ProspectID int FOREIGN KEY REFERENCES BrokerPortal.Prospects (ProspectID)
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,QuoteExpirationDate DATETIME NOT NULL DEFAULT(DATEADD(hour,18,GETDATE())) --check before using
   ,ContractGUID varchar
   ,ContractStatus varchar
   ,ContractSignDate DATETIME
   ,InitialRateQuote decimal(10,9) NOT NULL
   ,ValidatedRateQuote decimal(10,9)
   ,ValidatedRateDelta decimal(10,9)
   ,ValidationResult varchar -- note to self: valid possibilities to be enforced on server side()'finalized','rejected-late sign', 'rejected-rate delta over threshold','expired')

);
GO
CREATE TABLE BrokerPortal.RateListCumulative
(
   LineID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,Utility varchar(40)
   ,PremiseType varchar(20) NOT NULL
   ,Profile varchar(20) NOT NULL
   ,AnnualUsageLowerBound int NOT NULL  --Luke has one range like 0 - 50,000. Note to self: split during csv read.
   ,AnnualUsageUpperBound int NOT NULL
   ,StartDate DATETIME
   --,ContractLength3MonthRate decimal(10,9) NOT NULL
   --,ContractLength6MonthRate decimal(10,9) NOT NULL
   --,ContractLength12MonthRate decimal(10,9) NOT NULL
   --,ContractLength24MonthRate decimal(10,9) NOT NULL
   --Considering needs may change, I want to ask Luke if he would like to provide a longer spreadsheet where each line represents a contract length so that some programs can have different lengths additionally to the main 4 in future (15, 18, 30 etc)
   --If above is approved, comment out 4 above ContractLengthXMonthRate and uncomment below 2 fields.
   ,ContractLength tinyint NOT NULL
   ,ContractRate decimal(10,9) NOT NULL

);
GO
CREATE TABLE BrokerPortal.QuoteLineItems
(
   QuoteLineItemID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,QuoteID int NOT NULL FOREIGN KEY REFERENCES BrokerPortal.Quotes (QuoteID)
   ,ProspectMeterID int NOT NULL FOREIGN KEY REFERENCES BrokerPortal.ProspectMeters (ProspectMeterID)
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,Supplied_PremiseType varchar(20) NOT NULL
   ,Supplied_Profile varchar(20) NOT NULL
   ,Supplied_AnnualUsage int NOT NULL
   ,Supplied_Utility varchar(40)
   ,Validated_PremiseType varchar(20) NOT NULL
   ,Validated_Profile varchar(20) NOT NULL
   ,Validated_AnnualUsage int NOT NULL
   ,Validated_Utility varchar(40)
   ,InitialMeterRateLineItem int NOT NULL FOREIGN KEY REFERENCES BrokerPortal.RateListCumulative (LineID)
   ,InitialMeterRateQuote decimal(10,9) NOT NULL
   ,ValidatedMeterRateLineItem int NOT NULL FOREIGN KEY REFERENCES BrokerPortal.RateListCumulative (LineID)
   ,ValidatedMeterRateQuote decimal(10,9)
   ,ValidatedMeterRateDelta decimal(10,9)

);
GO
CREATE TABLE BrokerPortal.TemplateVariablesByState
(
   VariableID int IDENTITY(1,1) PRIMARY KEY NOT NULL
   ,CreatedOn DATETIME NOT NULL DEFAULT(GETDATE())
   ,CreatedBy varchar(50) NOT NULL
   ,ModifiedOn DATETIME
   ,ModifiedBy varchar(50)
   ,IsDeleted bit NOT NULL DEFAULT(0)
   ,DeletedOn DATETIME
   ,DeletedBy varchar(50)
   ,State varchar(2)
   ,PUC_Line1 varchar(100) NOT NULL
   ,PUC_Line2 varchar(100) NOT NULL
   ,TOS_Version varchar(100) NOT NULL
   ,GUID_SmCommConfirmation varchar(100) NOT NULL
   ,GUID_TOS varchar(100) NOT NULL

);
GO
