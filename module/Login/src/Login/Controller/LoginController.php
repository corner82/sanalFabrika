<?php

 namespace Login\Controller;

 use Zend\Mvc\Controller\AbstractActionController;
 use Zend\View\Model\ViewModel;
 use Zend\Session\Container;

 class LoginController extends AbstractActionController
 {
     public function indexAction()
     { 
         $viewModel = new \Zend\View\Model\ViewModel();
         $this->authenticate(null, $viewModel);
         return $viewModel;
         
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
                //print_r($result);
                if($result->getCode() == 1) {
                    /**
                     * creating a public key for every login operation
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $publicKey = $this->getServiceLocator()->get('servicePublicKeyGenerator');
                    //print_r($publicKey);
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
                        $url = $event->getRouter()->assemble(array('action' => 'index'), array('name' => 'login'));  
                        $response->setHeaders( $response->getHeaders ()->addHeaderLine ('Location', $url));
                        $response->setStatusCode(302);
                        $response->sendHeaders();
                        $event->stopPropagation();       
                        exit ();
                    }

                    $authManager->getStorage()->write(
                             array('id'          => $result->getIdentity(),
                                    'username'   => $result->getIdentity(),
                                    'ip_address' => $this->getRequest()->getServer('REMOTE_ADDR'),
                                    'user_agent'    => $request->getServer('HTTP_USER_AGENT'),
                                    'pk' => $publicKey, )
                        );
                    
                    
                    /**
                     * user role service will be tested
                     * @author Mustafa Zeynel Dağlı
                     * @since 28/01/2016
                     */
                    $this->getServiceLocator()->get('serviceRoleSessionWriter');
                    
                    
                    /**
                     * the public key cretaed is being inserted to database
                     * @author Mustafa Zeynel Dağlı
                     * @since 04/01/2016
                     */
                    $this->getServiceLocator()->get('servicePublicKeySaver');
                    $this->getServiceLocator()->get('serviceAuthenticatedRedirect'); 
                }
            } else {
                $authManager->getStorage()->clear();
                $viewModel->notValidated = true;
            }
        }
        
    }
     
    public function logoutAction()
    {
        $authManager = $this->getServiceLocator()->get('authenticationManagerDefault');
        $authManager->getStorage()->clear();
        /**
         * when logout the public key created in session table is being erased
         * @author Mustafa Zeynel Dağlı
         * @since 04/01/2016
         */
        $this->getServiceLocator()->get('servicePublicKeySaver');
        return $this->redirect()->toRoute('login');
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

