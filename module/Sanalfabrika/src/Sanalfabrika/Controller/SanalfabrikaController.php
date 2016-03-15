<?php

 namespace Sanalfabrika\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class SanalfabrikaController extends AbstractActionController
 {
     public function indexAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     public function registrationAction()  
     {
         
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        /*
        $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
        */
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
       
     public function loginAction()  
     {         
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        /*
        $tabActivationController = $this->success last insert Id from okan first insert call
         * then based on this id i have to update data
        */
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        $this->authenticate(null, $view);
        return $view;
     }  
         
     public function cmtAction(){
         $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');
        $publicKey = $this->getServiceLocator()
                            ->get('servicePublicKeyReader'); 
        
        // Do this inside your Controller before you return your ViewModel
        $this->layout()->setVariable('test', $langCode);
        
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
            'publicKey' => $publicKey,
        ));
        $this->authenticate(null, $view);
        return $view;
     }
     
     public function userprofileAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     
     public function userprofilepersonalAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     public function userprofileusersAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     public function userprofileprojectsAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     
     public function userprofilecommentsAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
     public function userprofilehistoryAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
          
     public function userprofilesettingsAction()  
     {
        $langCode = $this->getServiceLocator()
                            ->get('serviceTranslator');
        $requestUriRegulated = $this->getServiceLocator()
                            ->get('serviceTranslatorUrlRegulator');  
         
        $view = new ViewModel(array(
            'requestUriRegulated' => $requestUriRegulated,
            'langCode' => $langCode,
        ));
        return $view;
     }
     
      /** this function called by indexAction to reduce complexity of function */
    protected function authenticate($form = null, $viewModel = null)
    {
        $request = $this->getRequest();  
        if ($request->isPost()) { 
            $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
            // Create a validator chain and add validators to it
            $validatorChain = new \Zend\Validator\ValidatorChain();
            $validatorChain->attach(
                                new \Zend\Validator\StringLength(array('min' => 6,
                                                                     'max' => 100)))
                           /*->attach(new \Zend\I18n\Validator\Alnum())*/
                           ->attach(new \Zend\Validator\NotEmpty())
                           ->attach(new \Zend\Validator\EmailAddress());

            // Validate the email
            if ($validatorChain->isValid($_POST['eposta'])) {

                $authManager->getAdapter()
                            ->setIdentity($_POST['eposta'])
                            ->setCredential($_POST['sifre']);
                $result = $authManager->authenticate();
                print_r($result);
                
                if($result->getCode() == 1) {
                    /**
                     * creating a public key for every login operation
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $publicKey = $this->getServiceLocator()->get('servicePublicKeyGenerator');
                    //print_r($publicKey);
                    
                                        
                    /**
                     * sends login info to message queue
                     * @author Mustafa Zeynel Dağlı
                     * @todo after tests ,  thif feature will be added as a service manager entity
                     */
                    $loginLogoutMQ = new \Utill\MQ\LoginLogoutMQ();
                    $loginLogoutMQ->setChannelProperties(array('queue.name' => \Utill\MQ\LoginLogoutMQ::QUEUE_NAME));
                    $message = new \Utill\MQ\MessageMQ\MQMessageLoginLogout();
                    ;
                    //$message->setMessageBody(array('testmessage body' => 'test cevap'));
                    //$message->setMessageBody($e);

                    $message->setMessageBody(array('message' => 'Kullanıcı login işlemi', 
                                                   //'s_date'  => date('l jS \of F Y h:i:s A'),
                                                   's_date'  => date('Y-m-d G:i:s '),
                                                   'pk' => $publicKey,
                                                   'url' => '',
                                                   'path' =>'',
                                                   'method' => '',
                                                   'params' => $_POST,
                                                   'type_id' => \Utill\MQ\MessageMQ\MQMessageLoginLogout::LOGIN_OPERATAION,
                                                   'logFormat' => 'database'));
                    $message->setMessageProperties(array('delivery_mode' => 2,
                                                         'content_type' => 'application/json'));
                    $loginLogoutMQ->setMessage($message->setMessage());
                    $loginLogoutMQ->basicPublish();
                    
                   
                    
                    
                    
                    
                    /**
                     * when public key not created service returns true,
                     * if public key true we should logout
                     * @author Mustafa Zeynel Dağlı
                     * @since 27/01/2016
                     */
                    if($publicKey!=true) {
                        $event = $this->getEvent();
                        $authManager->getStorage()->clear();
                        $response = $this->getResponse();  
                        $url = $event->getRouter()->assemble(array('action' => 'index'), 
                                                             array('name' => 'sanalfabrika'));  
                        $response->setHeaders( $response->getHeaders()->addHeaderLine('Location', $url));
                        $response->setStatusCode(302);
                        $response->sendHeaders();
                        $event->stopPropagation();       
                        exit ();
                    }
                    $this->getServiceLocator()->setService('identity', $result->getIdentity());
                    //print_r($this->getServiceLocator()->get('identity'));
                    $userID = null;
                    $userIDService = $this->getServiceLocator()->get('serviceUserIDFinder');
                    if(is_integer($userIDService)) $userID = $userIDService;
                    $userID = $userIDService;
                    $authManager->getStorage()->write(
                             array('id'          => $userID,
                                    'username'   => $result->getIdentity(),
                                    'ip_address' => $this->getRequest()->getServer('REMOTE_ADDR'),
                                    'user_agent' => $request->getServer('HTTP_USER_AGENT'),
                                    'pk'         => $publicKey, )
                        );
                    
                    
                    /**
                     * user role service will be tested
                     * @author Mustafa Zeynel Dağlı
                     * @since 28/01/2016
                     */
                    $this->getServiceLocator()->get('serviceRoleSessionWriter');
                    print_r('---serviceRoleSessionWriter çağırıldı');
                    
                    
                    /**
                     * the public key cretaed is being inserted to database
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $this->getServiceLocator()->get('servicePublicKeySaver');
                    print_r('---servicePublicKeySaver çağırıldı');
                    //exit();
                    $this->getServiceLocator()->get('serviceAuthenticatedRedirectManager'); 
                }
            } else {
                $authManager->getStorage()->clear();
                $viewModel->notValidated = true;
            }
        }
        
    }
     
     
     public function addAction()
     {
     }

     public function editAction()
     {
     }

     public function deleteAction()
     {
     }
 }

