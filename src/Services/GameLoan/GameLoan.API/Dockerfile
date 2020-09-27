ARG RUNTIME_IMAGE_VERSION=3.1-buster-slim
ARG SDK_IMAGE_VERSION=3.1-buster

FROM mcr.microsoft.com/dotnet/core/aspnet:${RUNTIME_IMAGE_VERSION} AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:${SDK_IMAGE_VERSION} AS build
WORKDIR /src
COPY ["GameLoan.API.csproj", "."]
RUN dotnet restore "GameLoan.API.csproj"
COPY . .
WORKDIR /src
RUN dotnet build "GameLoan.API.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "GameLoan.API.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "GameLoan.API.dll"]
