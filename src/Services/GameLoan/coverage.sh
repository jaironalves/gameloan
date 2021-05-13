#!/bin/bash

# SETTING DIRECTORIES

BASE_DIR=`dirname "$0"`
BASE_FULL_DIR="$(cd "$(dirname "$1")" && pwd -P)/$(basename "$1")"

UNIT_PROJECT_DIR=$BASE_DIR'/GameLoan.UnitTests'
INTEGRATION_PROJECT_DIR=$BASE_DIR'/GameLoan.IntegrationTests'

# REMOVING
ECHO "REMOVING" $BASE_DIR'/TestResults'
rm -r $BASE_DIR'/TestResults'

# SETTING CONFIG VARIABLES
RESULTS_DIRECTORY=$BASE_DIR'/TestResults/Trx'
OUTPUT_FORMAT=\"json,cobertura\"
EXCLUDE_NS=\'[xunit.*]*\'

dotnet clean $UNIT_PROJECT_DIR
#dotnet clean $INTEGRATION_PROJECT_DIR

dotnet build $UNIT_PROJECT_DIR
#dotnet build $INTEGRATION_PROJECT_DIR

dotnet test $UNIT_PROJECT_DIR \
--no-restore \
--logger 'trx;LogFileName=UnitTests.trx' \
--results-directory $RESULTS_DIRECTORY \
-p:CollectCoverage=true \
-p:CoverletOutput='../TestResults/Coverage/UnitTests' \
-p:CoverletOutputFormat=$OUTPUT_FORMAT \
-p:Exclude=$EXCLUDE_NS

#dotnet test $INTEGRATION_PROJECT_DIR \
#--no-restore \
#--logger 'trx;LogFileName=IntegrationTests.trx' \
#--results-directory $RESULTS_DIRECTORY \
#-p:CollectCoverage=true \
#-p:CoverletOutput='../TestResults/Coverage/IntegrationTests' \
#-p:CoverletOutputFormat=$OUTPUT_FORMAT \
#-p:Exclude=$EXCLUDE_NS

dotnet tool install --global dotnet-reportgenerator-globaltool

UNIT_REPORT=$BASE_DIR'/TestResults/Coverage/UnitTests.cobertura.xml'
#INTEGRATION_REPORT=$BASE_DIR'/TestResults/Coverage/IntegrationTests.cobertura.xml'
TARGET_DIR=$BASE_DIR'/TestResults/Reports'
OPEN_HTML=$BASE_FULL_DIR$TARGET_DIR'/index.html'


reportgenerator \
-reports:$UNIT_REPORT \
-targetdir:$TARGET_DIR \
-reporttypes:HTML

#-reports:$UNIT_REPORT';'$INTEGRATION_REPORT \

start chrome $OPEN_HTML