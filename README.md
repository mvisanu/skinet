# skinet

Skinet

mkdir skinet
dotnet new sln 
dotnet new webapi -o API --framework "net5.0"
dotnet sln add .\API\API.csproj

dotnet dev-certs https -t

dotnet watch run

--see what dotnet framework versions are installed
dotnet --info

dotnet tool list -g

dotnet tool install --global dotnet-ef --version 5.0.3
dotnet tool update --global dotnet-ef --version 5.0.3

--add migration
dotnet ef migrations add InitialCreate -o Data/Migrations

dotnet ef database update

dotnet new classlib -o Core --framework "net5.0"

dotnet new classlib -o Infrastructure --framework "net5.0"

dotnet sln add .\Core\

dotnet sln add .\Infrastructure\

cd api
dotnet add reference ../Infrastructure

cd ..
cd infrastruture
dotnet add reference ../Core

dotnet restore
