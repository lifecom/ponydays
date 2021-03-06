<?php

	class PluginFeedbacks_ActionFeedbacks extends ActionPlugin{

		protected $oUserCurrent 		= null;
		protected $iCurrentUserId		= null;
		protected $bIsCurrentUserAdmin	= null;

		//***************************************************************************************
		public function Init(){
			if($this->User_IsAuthorization()){
				$this->oUserCurrent 		= $this->User_GetUserCurrent();
				$this->iCurrentUserId		= $this->oUserCurrent->getId();
				$this->bIsCurrentUserAdmin	= $this->oUserCurrent->isAdministrator();
			}

			$this->SetDefaultEvent('main');

		}

		//***************************************************************************************
		protected function RegisterEvent(){
			$this->AddEvent('main',					'EventMain');
			$this->AddEvent('LoadMoreActions',		'EventLoadMoreActions');
		}

		//***************************************************************************************
		protected function Redirect($sEvent = null, $sParam = null, $sMessage = null, $sError = null){
			$sPath	= Router::GetPath(Config::Get('plugin.feedbacks.url'));
			if(!empty($sEvent)) $sPath = $sPath.$sEvent.'/';
			if(!empty($sParam)) $sPath = $sPath.$sParam.'/';

			if(!empty($sMessage))	$this->Message_AddNotice($sMessage,'',true);
			if(!empty($sError))		$this->Message_AddErrorSingle($sError,'',true);

			return Router::Location($sPath);
		}

		//***************************************************************************************
		protected function CheckAdmin(){
			if($this->oUserCurrent){
				if(!$this->oUserCurrent->isAdministrator()) return Router::Location(Router::GetPath('error'));
			}else return Router::Location(Router::GetPath('error'));
		}

		//***************************************************************************************
		protected function CheckUserLogin(){
			if(!$this->oUserCurrent) return Router::Location(Router::GetPath('error'));
		}

		//***************************************************************************************
		protected function Error(){
			return Router::Location(Router::GetPath('error'));
		}

		//***************************************************************************************
		protected function ReturnToReferer(){
			return Router::Location($_SERVER['HTTP_REFERER']);
		}

		//***************************************************************************************
		//***************************************************************************************

		//***************************************************************************************
		protected function EventMain(){

			$this->CheckUserLogin();
			$this->PluginFeedbacks_Feedbacks_UpdateViewDatetimeByUserId($this->oUserCurrent->getId());

			$aActions	= $this->PluginFeedbacks_Feedbacks_GetActionsByUserId($this->oUserCurrent->getId(), 20);

			$this->Viewer_Assign('aActions', $aActions);

		}

		//***************************************************************************************
		protected function EventLoadMoreActions(){

			$aResult = array('Errors' => array(), 'Text' => '', 'Stats' => '');
			$this->CheckUserLogin();

			$iLastActionId	= getRequest('LastActionId');
			$aActions		= $this->PluginFeedbacks_Feedbacks_GetActionsByUserIdLastActionId($this->oUserCurrent->getId(), $iLastActionId, 20);

			$oViewerLocal = $this->Viewer_GetLocalViewer();
			$oViewerLocal->Assign('aActions', $aActions);

			$aResult['Text']	= $oViewerLocal->Fetch(Plugin::GetTemplatePath(__CLASS__).'actions.tpl');

			$this->Viewer_SetResponseAjax('json');
			$this->Viewer_AssignAjax('aResult', $aResult);

		}

		//***************************************************************************************
		protected function EventDebug(){
		}

		//***************************************************************************************
		public function EventShutdown(){
			$this->Viewer_AppendScript(Plugin::GetTemplateWebPath(__CLASS__) . "js/main.js");

			$this->Viewer_Assign('sTemplatePath', Plugin::GetTemplatePath(__CLASS__));
		}
	}
?>