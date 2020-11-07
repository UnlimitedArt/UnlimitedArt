     CREATE TABLE Clients (id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
          Username VARCHAR(20) ,
          Email VARCHAR(50)  ,
          password VARCHAR(100),
          Gender VARCHAR(10),
          Age int,
          City VARCHAR(20),
          Adresse VARCHAR(40),
          imgsrc VARCHAR(200),
          provider VARCHAR(20),
          providerId VARCHAR(50),
          CONSTRAINT EmaiUn UNIQUE (Email,Username)
     );
     