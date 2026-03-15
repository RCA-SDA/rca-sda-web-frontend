#!/bin/bash

# Secret Users Creation Script
# This script creates users for all roles in the RCA-SDA system

BASE_URL="https://rca-sda-backend.onrender.com"
API_ENDPOINT="/api/users"
PASSWORD="password123"

# Get admin token (you'll need to login first)
echo "Please login as admin first and get your token:"
echo "curl -X POST $BASE_URL/api/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"admin@example.com\",\"password\":\"password123\"}'"
echo ""
echo "Enter your admin token:"
read -r ADMIN_TOKEN

if [ -z "$ADMIN_TOKEN" ]; then
    echo "Error: Admin token is required"
    exit 1
fi

# Function to create user
create_user() {
    local role=$1
    local email=$2
    local first_name=$3
    local last_name=$4
    local gender=$5

    echo "Creating user: $email with role: $role"

    response=$(curl -s -X POST "$BASE_URL$API_ENDPOINT" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $ADMIN_TOKEN" \
        -d "{
            \"firstName\": \"$first_name\",
            \"lastName\": \"$last_name\",
            \"email\": \"$email\",
            \"gender\": \"$gender\",
            \"level\": \"Y1\",
            \"status\": \"GRADUATED\",
            \"role\": \"$role\",
            \"username\": \"${first_name,,}${last_name,,}\",
            \"enabled\": true,
            \"accountNonExpired\": true,
            \"accountNonLocked\": true,
            \"credentialsNonExpired\": true
        }")

    if echo "$response" | grep -q "error"; then
        echo "❌ Failed to create $email: $response"
    else
        echo "✅ Successfully created: $email"
    fi
    echo ""
}

# Create users for each role
echo "Starting user creation for all roles..."
echo "========================================"

# USER
create_user "USER" "user@gmail.com" "Regular" "User" "MALE"

# ADMIN
create_user "ADMIN" "admin@gmail.com" "System" "Admin" "MALE"

# ELDER_MALE
create_user "ELDER_MALE" "eldermale@gmail.com" "Elder" "Male" "MALE"

# ELDER_FEMALE
create_user "ELDER_FEMALE" "elderfemale@gmail.com" "Elder" "Female" "FEMALE"

# ASSISTANT_ELDER_MALE
create_user "ASSISTANT_ELDER_MALE" "assistanteldermale@gmail.com" "Assistant" "ElderMale" "MALE"

# ASSISTANT_ELDER_FEMALE
create_user "ASSISTANT_ELDER_FEMALE" "assistantelderfemale@gmail.com" "Assistant" "ElderFemale" "FEMALE"

# EVANGELISM_LEADER_MALE
create_user "EVANGELISM_LEADER_MALE" "evangelismleadermale@gmail.com" "Evangelism" "LeaderMale" "MALE"

# EVANGELISM_LEADER_FEMALE
create_user "EVANGELISM_LEADER_FEMALE" "evangelismleaderfemale@gmail.com" "Evangelism" "LeaderFemale" "FEMALE"

# JA_LEADER_MALE
create_user "JA_LEADER_MALE" "jaleadermale@gmail.com" "JA" "LeaderMale" "MALE"

# JA_LEADER_FEMALE
create_user "JA_LEADER_FEMALE" "jaleaderfemale@gmail.com" "JA" "LeaderFemale" "FEMALE"

# MIFEM_LEADER
create_user "MIFEM_LEADER" "mifemleader@gmail.com" "MIFEM" "Leader" "FEMALE"

# ASSISTANT_MIFEM_LEADER
create_user "ASSISTANT_MIFEM_LEADER" "assistantmifemleader@gmail.com" "Assistant" "MIFEMLeader" "MALE"

# COMMUNITY_OUTREACH_LEADER
create_user "COMMUNITY_OUTREACH_LEADER" "communityoutreachleader@gmail.com" "Community" "OutreachLeader" "MALE"

# CHOIR_LEADER
create_user "CHOIR_LEADER" "choirleader@gmail.com" "Choir" "Leader" "MALE"

# CHOIR_PATRON
create_user "CHOIR_PATRON" "choirpatron@gmail.com" "Choir" "Patron" "MALE"

# CHOIR_DISCIPLINARY_LEADER
create_user "CHOIR_DISCIPLINARY_LEADER" "choirdisciplinaryleader@gmail.com" "Choir" "DisciplinaryLeader" "MALE"

# CHOIR_MATRON
create_user "CHOIR_MATRON" "choirmatron@gmail.com" "Choir" "Matron" "FEMALE"

# CHOIR_SECRETARY
create_user "CHOIR_SECRETARY" "choirsecretary@gmail.com" "Choir" "Secretary" "FEMALE"

# CHURCH_SECRETARY
create_user "CHURCH_SECRETARY" "churchsecretary@gmail.com" "Church" "Secretary" "FEMALE"

# GRAND_FATHER
create_user "GRAND_FATHER" "grandfather@gmail.com" "Grand" "Father" "MALE"

# GRAND_MOTHER
create_user "GRAND_MOTHER" "grandmother@gmail.com" "Grand" "Mother" "FEMALE"

# FATHER
create_user "FATHER" "father@gmail.com" "Church" "Father" "MALE"

# MOTHER
create_user "MOTHER" "mother@gmail.com" "Church" "Mother" "FEMALE"

# DEACON
create_user "DEACON" "deacon@gmail.com" "Church" "Deacon" "MALE"

# DEACON_LEADER_MALE
create_user "DEACON_LEADER_MALE" "deaconleadermale@gmail.com" "Deacon" "LeaderMale" "MALE"

# DEACON_LEADER_FEMALE
create_user "DEACON_LEADER_FEMALE" "deaconleaderfemale@gmail.com" "Deacon" "LeaderFemale" "FEMALE"

echo "========================================"
echo "User creation completed!"
echo ""
echo "All users have password: $PASSWORD"
echo ""
echo "Test login examples:"
echo "curl -X POST $BASE_URL/api/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"eldermale@gmail.com\",\"password\":\"$PASSWORD\"}'"
echo "curl -X POST $BASE_URL/api/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"evangelismleadermale@gmail.com\",\"password\":\"$PASSWORD\"}'"
