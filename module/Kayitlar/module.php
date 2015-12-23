<?php
/**
 * OSTİM TEKNOLOJİ Framework 
 *
 * @link      https://github.com/corner82/slim_test for the canonical source repository
 * @copyright Copyright (c) 2015 OSTİM TEKNOLOJİ (http://www.ostim.com.tr)
 * @license   
 */
namespace Kayitlar;

 use Zend\ModuleManager\Feature\AutoloaderProviderInterface;
 use Zend\ModuleManager\Feature\ConfigProviderInterface;
 use Zend\Mvc\ModuleRouteListener;
 use Zend\Mvc\MvcEvent;
 use Zend\Session\SessionManager;
 use Zend\Session\Container;

 class Module implements AutoloaderProviderInterface, ConfigProviderInterface
 {
     
     public function init() {

     }
     
     public function onBootstrap(MvcEvent $e)
    {
         
        
    }
    
    /**
     * Translater service has been launched on 'dispatch' event 
     * in this function scope
     * @param MvcEvent $e
     * @author Mustafa Zeynel Dağlı
     * @since 17/12/2015
     */
    public function translaterControl(MvcEvent $e) {
        $e->getApplication()
          ->getServiceManager()
          ->get('serviceTranslator');
    }

    public function sessionExpireControl(MvcEvent $e) { 
        $serviceManager = $e->getApplication()->getServiceManager();
        $sessionManager = $serviceManager ->get('SessionManagerDefault');
        $serviceManager ->get('sessionExpireControler');
    }


    public function authControl(MvcEvent $e) {

        /* 
         * sessionManager servis çağırılıyor
         */ 
        $serviceManager = $e->getApplication()->getServiceManager();
        
        
        // if auth control will be made block
        if($serviceManager->get('authenticationControlerLocator')) {
            // calling auth service and makes auth control inside service
            $serviceManager->get('serviceAuthenticate');
        } 
    }

    public function getServiceConfig()
    {
         
    }
    
     public function getAutoloaderConfig()
     {
         return array(
             'Zend\Loader\ClassMapAutoloader' => array(
                 __DIR__ . '/autoload_classmap.php',
             ),
             'Zend\Loader\StandardAutoloader' => array(
                 'namespaces' => array(
                     __NAMESPACE__ => __DIR__ . '/src/' . __NAMESPACE__,
                 ),
             ),
         );
     }

     public function getConfig()
     {
         return include __DIR__ . '/config/module.config.php';
     }
 }

