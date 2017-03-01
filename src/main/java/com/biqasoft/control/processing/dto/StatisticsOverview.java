/*
* Copyright (c) 2016 biqasoft.com




 */

package com.biqasoft.control.processing.dto;

/**
 * Created by Nikita Bakaev, ya@nbakaev.ru on 2/12/2016.
 * All Rights Reserved
 */
public class StatisticsOverview {
    private long domains;
    private long userAccounts;


    public long getDomains() {
        return domains;
    }

    public void setDomains(long domains) {
        this.domains = domains;
    }

    public long getUserAccounts() {
        return userAccounts;
    }

    public void setUserAccounts(long userAccounts) {
        this.userAccounts = userAccounts;
    }
}
