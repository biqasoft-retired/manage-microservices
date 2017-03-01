/*
* Copyright (c) 2016 biqasoft.com




 */

package com.biqasoft.control.processing;

import com.biqasoft.control.processing.dto.StatisticsOverview;
import com.biqasoft.entity.core.Domain;
import com.biqasoft.microservice.common.MicroserviceDomain;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Nikita Bakaev, ya@nbakaev.ru
 *         Date: 10/5/2015
 *         All Rights Reserved
 */
@RestController
@Api("Control domains")
@RequestMapping("/domains")
public class ControlDomainController {

    private final MicroserviceDomain microserviceDomain;
    private final StatsService statsService;

    @Autowired
    public ControlDomainController(MicroserviceDomain microserviceDomain, StatsService statsService) {
        this.microserviceDomain = microserviceDomain;
        this.statsService = statsService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Domain> findAllInDomainsUnsafe() {
        return microserviceDomain.unsafeFindAllDomains();
    }

    @RequestMapping(value = "stats", method = RequestMethod.GET)
    public StatisticsOverview StatisticsOverview() {
        return statsService.statisticsOverview();
    }

    @ApiOperation(value = "update")
    @RequestMapping(value = "", method = RequestMethod.PUT)
    public Domain updateDomain(@RequestBody Domain domain) {
        return microserviceDomain.unsafeUpdateDomain(domain);
    }

    @ApiOperation(value = "add")
    @RequestMapping(value = "", method = RequestMethod.POST)
    public Domain addDomain(@RequestBody Domain domain) {
        return microserviceDomain.create(domain);
    }

    @ApiOperation(value = "delete")
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteDomain(@PathVariable("id") String id) {
        microserviceDomain.unsafeDelete(id);
    }
}