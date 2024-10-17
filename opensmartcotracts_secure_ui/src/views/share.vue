<!-- @format -->

<template>
	<navBar />

	<v-container>
		<div class="mb-5">
			{{ mem.name
			}}<v-icon color="blue" class="ps-2 ms-2">mdi-hand-wave</v-icon>
		</div>
		<div class="mt-2 div-card">
			<div class="unit-center my-5 py-5">
				<form @submit="shareDocuments">
					<label class="form-label" for="form4Example1">Attach document</label>
					<div class="form-outline mb-4 input-border">
						<input
							@change="onChanges"
							type="file"
							id="form4Example1"
							class="form-control px-5 py-5 file"
						/>
					</div>

					<label class="form-label" for="form4Example2">Wallet Address</label>
					<!-- <div class="form-outline mb-4">
						<v-select
							class="form-control input-border"
							:allUsers="allUsers"
							label="Send to"
							solo
						></v-select>
					</div> -->
					<!-- <label class="form-label" for="form4Example2">Document name</label> -->
					<div class="form-outline mb-4">
						<input
						  v-model="wallet"
							type="text"
							id="form4Example1"
							class="form-control input-border"
						/>
					</div>

					<label class="form-label" for="form4Example3">Comment</label>
					<div class="form-outline mb-4">
						<textarea
							class="form-control input-card"
							id="form4Example3"
							rows="4"
							v-model="Comment"
						></textarea>
					</div>

					<div class="unit-center">
						<button
							type="submit"
							class="btn-primary btn-block mb-4"
							style="background-color: #04c35c"
						>
							<span class="mx-5 px-5 text-white">SEND</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	</v-container>
</template>

<script>
	import emitter from "tiny-emitter/instance";
	import { create } from "ipfs-client";
	import { ethers, Signer } from "ethers";
	import { abi, contractAddress } from "../../secDocConstants";
	import navBar from "../components/shared/Sidebar.vue";

	const client = create({
		http: "/ip4/127.0.0.1/tcp/5001",
	});

	export default {
		name: "dashPage",
		components: {
			navBar,
		},
		data() {
			return {
				file: "",
				receiver: "",
				Comment: "",
				wallet: "",
				open: true,
				group: null,
				docName: "",
				mem: {},

				allUsers: ["users"],
			};
		},
		async created() {
			this.mem = await this.userLogin();
			// this.allUsers = await this.returnAllUsers();
		},
		methods: {
			async userLogin() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const user = await contract.operatorFinder(signer.getAddress());
				console.log(user);
				return user;
			},
			async shareDocuments(e) {
				e.preventDefault();
				// const wallet = this.wallet;
				const Comment = this.Comment;
				const docName = this.file.name;
				const receiver = this.wallet;
				const time = Date.now().toString();

				const cid = await client.add(this.file);
				const docId = cid.path;

				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const result = await contract.sendDocument(
					receiver,
					docId,
					time,
					Comment,
					docName,
				);
			},

			async receiveDoc() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const result = await contract.receivedDocs();
				console.log(result);
			},

			async returnAllUsers() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const allUsers = await contract.getAllOperators();
			},

			onChanges(e) {
				this.file = e.target.files[0];
				return file;
			},
		},
	};
</script>

<style>
	.coll {
		background-color: rgba(27, 173, 222, 0.45);
	}

	.navbar2 {
		position: absolute;
		top: 85px;
		left: 2%;
	}

	.word {
		left: 20px;
		font-family: "Montserrat";
		font-style: normal;
		font-weight: 700;
		font-size: 48px;
		line-height: 66px;
		/* identical to box height, or 138% */

		color: #095073;
	}
	.fol-text {
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 18px;
	}
	.text {
		font-family: "Lato";
		font-style: normal;
		font-weight: 600;
		font-size: 30px;
		line-height: 29px;
	}
	.input {
		width: 10%;
		border-radius: 4px solid grey;
	}
	.table-text {
		height: 18px;
		width: 100%;
		font-family: "Lato";
		font-style: normal;
		/* font-weight: 500;
font-size: 14px;
line-height: 18px; */
		/* identical to box height, or 129% */

		/* Gray/500 */

		color: #667085;
	}

	.cardpos {
		display: flexbox;
		top: 30%;
		bottom: 60%;
		justify-self: center;
		background: #ffffff;
		border-radius: 20px;
	}
	.progress {
		background: #051f61;
	}
	.unit-center {
		display: flex;
		justify-content: center;
	}
	.card-text-color {
		color: #051f61;
	}
	.folder-text {
		font-family: "Lato";
		font-style: normal;
		font-weight: 500;
		font-size: 24px;
		line-height: 29px;

		/* Main color 2 */

		color: #051f61;
	}
	.col-card {
		border: 2px solid rgba(0, 0, 0, 0.06);
		border-radius: 8px;

		/* Inside auto layout */

		flex: none;
		order: 0;
		flex-grow: 0;
	}

	.img-fol {
		background: linear-gradient(
				314.09deg,
				rgba(255, 255, 255, 0.2) -16.73%,
				rgba(255, 255, 255, 0) 62.3%
			),
			#1badde;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08),
			0px 2px 4px rgba(44, 43, 42, 0.1),
			inset 0px -14px 21px rgba(0, 0, 0, 0.08);
		border-radius: 7px;
	}
	.add-color {
		background: #ebf2ff;
	}

	.div-card {
		background: #ffffff;
		box-shadow: 0px 4px 0px 7px #cff2fe;
	}
	.input-card {
		border: 1px solid #22b0df;
	}
	.input-border {
		border: 1px solid #22b0df;
		width: 566px;
		height: 68px;
	}
</style>
