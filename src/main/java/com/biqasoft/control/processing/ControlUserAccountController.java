/*
* Copyright (c) 2016 biqasoft.com




 */

package com.biqasoft.control.processing;

import com.biqasoft.entity.dto.useraccount.UserRegisterRequest;
import com.biqasoft.entity.core.useraccount.UserAccount;
import com.biqasoft.microservice.common.MicroserviceUsersRepository;
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
@Api("Control user accounts")
@RequestMapping("/accounts")
public class ControlUserAccountController {

    private final MicroserviceUsersRepository microserviceUsersRepository;

    @Autowired
    public ControlUserAccountController(MicroserviceUsersRepository microserviceUsersRepository) {
        this.microserviceUsersRepository = microserviceUsersRepository;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<UserAccount> getAllUserAccount() {
        return microserviceUsersRepository.unsafeFindAllUsers();
    }

    @ApiOperation(value = "update")
    @RequestMapping(value = "", method = RequestMethod.PUT)
    public UserAccount updateUserAccount(@RequestBody UserAccount userAccount) {
        return microserviceUsersRepository.updateUserAccount(userAccount);
    }

    @ApiOperation(value = "add")
    @RequestMapping(value = "", method = RequestMethod.POST)
    public UserAccount addUserAccount(@RequestBody UserAccountAddRequest userAccount) {
        UserRegisterRequest requestDTO = new UserRegisterRequest(userAccount, false, userAccount.getDomain(), null);
        return microserviceUsersRepository.addUser(requestDTO);
    }

    @ApiOperation(value = "delete")
    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    public void deleteUserAccountByUsername(@PathVariable("id") String id) {
        microserviceUsersRepository.unsafeDeleteUserById(id);
    }

}


class UserAccountAddRequest extends UserAccount{

    private String domain;

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}