/*
* Copyright (c) 2016 biqasoft.com




 */

package com.biqasoft.control.processing;

import com.biqasoft.control.processing.dto.StatisticsOverview;
import com.biqasoft.microservice.common.MicroserviceDomain;
import com.biqasoft.microservice.common.MicroserviceUsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Nikita Bakaev, ya@nbakaev.ru on 2/12/2016.
 * All Rights Reserved
 */
@Service
public class StatsService {

    private final MicroserviceDomain microserviceDomain;
    private final MicroserviceUsersRepository microserviceUsersRepository;

    @Autowired
    public StatsService(MicroserviceDomain microserviceDomain, MicroserviceUsersRepository microserviceUsersRepository) {
        this.microserviceDomain = microserviceDomain;
        this.microserviceUsersRepository = microserviceUsersRepository;
    }

    public StatisticsOverview statisticsOverview() {
        StatisticsOverview statisticsOverview = new StatisticsOverview();
        statisticsOverview.setDomains(microserviceDomain.unsafeFindAllDomains().size());
        statisticsOverview.setUserAccounts(microserviceUsersRepository.unsafeFindAllUsers().size());

        return statisticsOverview;
    }

}